const Package = require('../models/Package');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

exports.importPackages = async (req, res) => {
  try {
    if (!req.file) {
      console.error('❌ [Package Import] No file received — check that the frontend is sending FormData with key "file"');
      return res.status(400).json({ message: 'Please upload an Excel file' });
    }

    console.log(`📂 [Package Import] Received file: ${req.file.originalname} (${req.file.size} bytes) at ${req.file.path}`);

    const filePath = req.file.path;

    // Verify file exists before reading
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [Package Import] File not found at path: ${filePath}`);
      return res.status(500).json({ message: 'Uploaded file not found on server' });
    }

    const workbook = xlsx.readFile(filePath);
    console.log(`📊 [Package Import] Workbook sheets: ${workbook.SheetNames.join(', ')}`);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(`📊 [Package Import] Parsed ${data.length} rows from sheet "${sheetName}"`);

    if (!data.length) {
      // Clean up empty file
      fs.unlinkSync(filePath);
      console.warn(`⚠️ [Package Import] No data rows found in upload — expected HOTEL / DESTINATION / DURATION columns`);
      return res.status(400).json({ message: 'Excel file appears to be empty or has no readable data rows' });
    }

    console.log(`📋 [Package Import] First row sample:`, JSON.stringify(data[0]).substring(0, 200));

    const packages = data.map((row, idx) => {
      const title = row['HOTEL'] || row['TITLE'] || row['hotel'] || row['title'];
      if (!title) {
        console.warn(`⚠️ [Package Import] Row ${idx + 1}: missing TITLE/HOTEL column, skipping`);
        return null;
      }
      return {
        title,
        destination: row['DESTINATION'] || row['destination'] || 'Unknown',
        duration: row['DURATION'] || row['duration'] || 'N/A',
        transport: row['TRANSPORT'] || row['transport'] || 'N/A',
        mealPlan: row['MEAL PLAN'] || row['MEAL-PLAN'] || row['meal_plan'] || row['mealPlan'] || 'N/A',
        price: Number(row['SELLING PRICE'] || row['selling_price'] || row['price']) || 0,
        netCost: Number(row['TOTAL NET COST'] || row['total_net_cost'] || row['netCost']) || 0,
        profit: Number(row['PROFIT'] || row['profit']) || 0,
        featured: String(row['FEATURED'] || row['featured']).toLowerCase() === 'yes',
        season: row['SEASON'] || row['season'] || 'All Year',
        category: row['CATEGORY'] || row['category'] || 'General',
        images: row['IMAGES'] ? String(row['IMAGES']).split(',').map(img => img.trim()).filter(Boolean) : [],
        overview: row['OVERVIEW'] || row['overview'] || '',
        hotelInfo: row['HOTEL'] || row['HOTEL INFO'] || row['hotelInfo'] || '',
      };
    }).filter(Boolean);

    console.log(`✅ [Package Import] ${packages.length} valid packages ready for insertion`);

    if (packages.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'No valid package rows found. Check your Excel column headers.' });
    }

    await Package.insertMany(packages);
    console.log(`✅ [Package Import] Successfully inserted ${packages.length} packages into MongoDB`);

    // Clean up uploaded file
    fs.unlinkSync(filePath);
    console.log(`🗑️  [Package Import] Cleaned up temp file`);

    res.status(200).json({
      message: `${packages.length} package(s) imported successfully`,
      count: packages.length
    });
  } catch (error) {
    console.error('❌ [Package Import] Error:', error);
    // Attempt to clean up file even on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Error importing packages', error: error.message });
  }
};

exports.getPackages = async (req, res) => {
  try {
    const { search, destination, category, season, duration } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { hotelInfo: { $regex: search, $options: 'i' } }
      ];
    }

    if (destination) query.destination = destination;
    if (category) query.category = category;
    if (season) query.season = season;
    if (duration) query.duration = duration;

    const packages = await Package.find(query).sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error: error.message });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching package', error: error.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({ message: 'Error updating package', error: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error: error.message });
  }
};
