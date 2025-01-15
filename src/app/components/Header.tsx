import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full bg-[#111C2A] shadow-md">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Logo.png"
                alt="Logo"
                width={151}
                height={40}
                className="object-contain"
              />
            </Link>
            
            {/* Separador vertical */}
            <div className="h-8 w-px bg-gray-400 mx-4"></div>
            
            {/* Campo do nome do curso */}
            <div className="relative">
                <h3 className="text-white text-xs font-bold uppercase">
                    Gestão Comercial: negócios digitais
                </h3>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 ml-6">
              {/* Ícone de IA */}
              <button className="text-white hover:text-blue-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13.8953 6.06773L13.8953 6.06776C14.6333 7.90859 16.0915 9.36679 17.9324 10.1048L17.9324 10.1048L22.5112 11.9404L17.9324 13.7759L17.9324 13.7759C16.0915 14.5139 14.6333 15.9721 13.8953 17.813L13.8953 17.813L12.0597 22.3919L10.2242 17.813L10.2242 17.813C9.48617 15.9721 8.02798 14.5139 6.18714 13.7759L6.18711 13.7759L1.60825 11.9404L6.18711 10.1048L6.18714 10.1048C8.02798 9.36679 9.48617 7.90859 10.2242 6.06776L10.2242 6.06773L12.0597 1.48886L13.8953 6.06773Z" fill="white" stroke="white"/>
                <path d="M3.84898 21.507C3.56385 20.9723 3.12578 20.5343 2.59115 20.2491C3.12578 19.964 3.56385 19.5259 3.84898 18.9913C4.13412 19.5259 4.57218 19.964 5.10681 20.2491C4.57218 20.5343 4.13412 20.9723 3.84898 21.507Z" stroke="white" stroke-width="2.25" stroke-miterlimit="10" />
                <path d="M18.9661 3.77305C19.5008 3.48792 19.9388 3.04986 20.224 2.51522C20.5091 3.04986 20.9472 3.48792 21.4818 3.77305C20.9472 4.05819 20.5091 4.49625 20.224 5.03089C19.9388 4.49625 19.5008 4.05819 18.9661 3.77305Z" stroke="white" stroke-width="2.25" stroke-miterlimit="10"/>
                </svg>
              </button>

              {/* Ícone de Notificação */}
              <button className="text-white hover:text-blue-200 transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_68_152" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_68_152)">
                    <path d="M5 19C4.71667 19 4.47917 18.9042 4.2875 18.7125C4.09583 18.5208 4 18.2833 4 18C4 17.7167 4.09583 17.4792 4.2875 17.2875C4.47917 17.0958 4.71667 17 5 17H6V10C6 8.61667 6.41667 7.3875 7.25 6.3125C8.08333 5.2375 9.16667 4.53333 10.5 4.2V3.5C10.5 3.08333 10.6458 2.72917 10.9375 2.4375C11.2292 2.14583 11.5833 2 12 2C12.4167 2 12.7708 2.14583 13.0625 2.4375C13.3542 2.72917 13.5 3.08333 13.5 3.5V4.2C14.8333 4.53333 15.9167 5.2375 16.75 6.3125C17.5833 7.3875 18 8.61667 18 10V17H19C19.2833 17 19.5208 17.0958 19.7125 17.2875C19.9042 17.4792 20 17.7167 20 18C20 18.2833 19.9042 18.5208 19.7125 18.7125C19.5208 18.9042 19.2833 19 19 19H5ZM12 22C11.45 22 10.9792 21.8042 10.5875 21.4125C10.1958 21.0208 10 20.55 10 20H14C14 20.55 13.8042 21.0208 13.4125 21.4125C13.0208 21.8042 12.55 22 12 22ZM8 17H16V10C16 8.9 15.6083 7.95833 14.825 7.175C14.0417 6.39167 13.1 6 12 6C10.9 6 9.95833 6.39167 9.175 7.175C8.39167 7.95833 8 8.9 8 10V17Z" fill="white"/>
                </g>
                </svg>
                {/* Indicador de notificação */}
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
              </button>

              {/* Perfil com foto */}
              <button className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src="/images/profile-placeholder.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 