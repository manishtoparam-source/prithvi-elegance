@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-navy-950 text-white font-sans;
  }
}

@layer components {
  .btn-primary {
    @apply bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900;
  }
  .btn-secondary {
    @apply bg-transparent border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-navy-950 font-semibold px-6 py-3 rounded-lg transition-all duration-200;
  }
  .input-field {
    @apply w-full bg-navy-800 border border-navy-600 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200;
  }
  .card {
    @apply bg-navy-900 border border-navy-700 rounded-2xl shadow-xl;
  }
  .select-field {
    @apply w-full bg-navy-800 border border-navy-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 cursor-pointer;
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: #b8972b #162559;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #162559;
}
::-webkit-scrollbar-thumb {
  background-color: #b8972b;
  border-radius: 3px;
}
