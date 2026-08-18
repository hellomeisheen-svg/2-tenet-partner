import { EditorWrapper } from './EditorWrapper';
import { Image as ImageIcon, FileText, Upload, Search, Trash2, Eye, ExternalLink } from 'lucide-react';

export function MediaLibrary() {
  const mockFiles = [
    { name: 'tenet-hero.png', size: '1.2 MB', type: 'image', date: '12.08.2026', url: '/assets/tenet-hero.png' },
    { name: 'happy-1.jpg', size: '450 KB', type: 'image', date: '14.08.2026', url: '/assets/happy-1.jpg' },
    { name: 'happy-2.jpg', size: '520 KB', type: 'image', date: '14.08.2026', url: '/assets/happy-2.jpg' },
    { name: 'privacy-policy.pdf', size: '180 KB', type: 'pdf', date: '10.08.2026', url: '#' },
    { name: 'tenet-logo.svg', size: '12 KB', type: 'svg', date: '01.08.2026', url: '/assets/tenet-logo.svg' },
  ];

  return (
    <EditorWrapper 
      title="Медиабиблиотека" 
      description="Управление изображениями и документами сайта"
    >
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-white p-6 border border-graphite/5 rounded-sm flex flex-col items-center justify-center gap-4 border-dashed border-red/20 group hover:bg-beige-soft/30 transition-all cursor-pointer">
          <div className="w-12 h-12 bg-red/5 rounded-full flex items-center justify-center text-red group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-heading uppercase tracking-widest text-graphite-dark">Загрузить файлы</p>
            <p className="text-[10px] text-graphite/40 font-body mt-1">Перетащите сюда или нажмите для выбора</p>
          </div>
        </div>
        
        <div className="w-full md:w-64 bg-white p-6 border border-graphite/5 rounded-sm space-y-4">
          <p className="text-[10px] uppercase tracking-[0.2em] font-heading text-graphite/40">Статистика</p>
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-xs text-graphite/60 font-body">Всего файлов</span>
              <span className="text-sm font-heading text-graphite">24</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs text-graphite/60 font-body">Занято места</span>
              <span className="text-sm font-heading text-graphite">18.4 MB</span>
            </div>
            <div className="w-full h-1.5 bg-beige-soft rounded-full overflow-hidden">
              <div className="w-[18%] h-full bg-red"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/20" />
          <input 
            type="text" 
            placeholder="Поиск по названию..." 
            className="w-full bg-white border border-graphite/5 rounded-sm pl-11 pr-4 py-3 text-sm text-graphite focus:outline-none focus:border-red/20"
          />
        </div>
        <div className="flex bg-beige-soft p-1 rounded-sm border border-graphite/5">
          <button className="p-2 bg-white shadow-sm rounded-sm text-red">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button className="p-2 text-graphite/40 hover:text-graphite transition-colors">
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mockFiles.map((file, i) => (
          <div key={i} className="group flex flex-col bg-white border border-graphite/5 rounded-sm overflow-hidden hover:border-red/20 hover:shadow-lg transition-all">
            <div className="aspect-square bg-beige-soft relative flex items-center justify-center overflow-hidden">
              {file.type === 'image' || file.type === 'svg' ? (
                <div className="absolute inset-0 bg-graphite/20 flex items-center justify-center text-[10px] text-white font-heading uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm">
                  {file.name}
                </div>
              ) : (
                <FileText className="w-10 h-10 text-graphite/10" />
              )}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button className="p-1.5 bg-white text-graphite/60 hover:text-red rounded-sm shadow-sm transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="p-3 border-t border-graphite/5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-heading text-graphite truncate block">{file.name}</span>
                <ExternalLink className="w-3 h-3 text-graphite/20 flex-shrink-0" />
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[9px] text-graphite/40 uppercase tracking-tighter">{file.size}</span>
                <span className="text-[9px] text-graphite/40">{file.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </EditorWrapper>
  );
}
