import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit2, Trash2, MapPin, 
  Clock, DollarSign, Tag, Image as ImageIcon, X,
  FileSpreadsheet, Upload, Download, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axios';

const PackagesManagement = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [importFile, setImportFile] = useState(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    duration: '',
    transport: '',
    mealPlan: '',
    price: '',
    featured: false,
    season: '',
    overview: '',
    category: ''
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await api.get('/packages');
      setPackages(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setPackages([]);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        await api.put(`/packages/${editingPackage._id}`, formData);
      } else {
        await api.post('/packages', formData);
      }
      setShowModal(false);
      setEditingPackage(null);
      fetchPackages();
    } catch (error) {
      alert('Error saving package');
    }
  };

  const handleImport = async (e) => {
    e.preventDefault();
    if (!importFile) return;

    setImportLoading(true);
    setImportStatus(null);
    const data = new FormData();
    data.append('file', importFile);

    try {
      console.log('📤 [Package Import] Uploading file:', importFile.name, importFile.size, 'bytes');
      const response = await api.post('/packages/import', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('✅ [Package Import] Response:', response.data);
      setImportStatus({ type: 'success', message: response.data.message || `${response.data.count} packages imported` });
      fetchPackages();
      setTimeout(() => {
        setShowImportModal(false);
        setImportStatus(null);
        setImportFile(null);
      }, 2500);
    } catch (error) {
      console.error('❌ [Package Import] Error:', error?.response?.data || error.message);
      const msg = error?.response?.data?.message || error?.message || 'Import failed. Please check that the file is a valid .xlsx spreadsheet.';
      setImportStatus({ type: 'error', message: msg });
    } finally {
      setImportLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this package?')) {
      try {
        await api.delete(`/packages/${id}`);
        fetchPackages();
      } catch (error) {
        alert('Error deleting package');
      }
    }
  };

  const filteredPackages = packages.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 rounded-3xl border border-white/5 p-6 bg-slate-900/50 backdrop-blur-xl">
        <div className="relative flex-1 lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C5A059]/40"
          />
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <button 
            onClick={() => setShowImportModal(true)}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            <FileSpreadsheet size={18} />
            Import Excel
          </button>
          <button 
            onClick={() => {
              setEditingPackage(null);
              setFormData({
                title: '', destination: '', duration: '', transport: '',
                mealPlan: '', price: '', featured: false, season: '',
                overview: '', category: ''
              });
              setShowModal(true);
            }}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b08d4a] text-white px-8 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-[#C5A059]/20"
          >
            <Plus size={18} />
            Create Package
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Synchronizing Database...</p>
          </div>
        ) : filteredPackages.map((pkg) => (
          <motion.div 
            key={pkg._id}
            layout
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group"
          >
            <div className="relative h-48">
              <img 
                src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1516426122078-c23e76319801'} 
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => {
                    setEditingPackage(pkg);
                    setFormData(pkg);
                    setShowModal(true);
                  }}
                  className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-slate-600 hover:text-[#C5A059] transition-colors shadow-sm"
                >
                  <Edit2 size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(pkg._id)}
                  className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-slate-600 hover:text-rose-500 transition-colors shadow-sm"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              {pkg.featured && (
                <div className="absolute bottom-4 left-4 bg-[#C5A059] text-white px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest">
                  Featured
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 text-[#C5A059] text-[9px] font-bold uppercase tracking-widest mb-3">
                <MapPin size={12} />
                {pkg.destination}
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-6 line-clamp-1">{pkg.title}</h3>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{pkg.duration}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-serif text-slate-900">${pkg.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* IMPORT MODAL */}
      <AnimatePresence>
        {showImportModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowImportModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden p-8"
            >
              <h3 className="text-2xl font-serif mb-2">Import Packages</h3>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-8">Upload Excel (.xlsx) data source</p>
              
              <form onSubmit={handleImport} className="space-y-6">
                <label 
                  htmlFor="excel-upload" 
                  className="border-2 border-dashed border-slate-100 rounded-3xl p-10 flex flex-col items-center justify-center text-center group hover:border-[#C5A059]/50 transition-colors cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="text-slate-400 group-hover:text-[#C5A059]" size={24} />
                  </div>
                  <input 
                    type="file" 
                    accept=".xlsx, .xls"
                    className="hidden" 
                    id="excel-upload"
                    onChange={(e) => setImportFile(e.target.files[0])}
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-600 mb-1">
                      {importFile ? importFile.name : 'Choose Excel file'}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Click to browse or drag and drop</p>
                  </div>
                </label>

                {importStatus && (
                  <div className={`p-4 rounded-2xl flex items-center gap-3 ${importStatus.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {importStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <span className="text-xs font-bold uppercase tracking-widest">{importStatus.message}</span>
                  </div>
                )}

                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setShowImportModal(false)}
                    className="flex-1 py-4 text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >Cancel</button>
                  <button 
                    type="submit"
                    disabled={importLoading || !importFile}
                    className="flex-1 bg-slate-900 text-white py-4 rounded-2xl text-xs uppercase tracking-widest font-bold hover:bg-[#C5A059] transition-all disabled:opacity-50"
                  >
                    {importLoading ? 'Processing...' : 'Upload Data'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE/EDIT MODAL - Simplified for brevity in this response */}
      {/* ... (Standard form implementation similar to ToursManagement) */}
    </div>
  );
};

export default PackagesManagement;
