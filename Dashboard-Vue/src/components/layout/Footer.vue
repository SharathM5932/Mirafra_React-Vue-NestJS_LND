<template>
  <footer class="bg-white border-t border-gray-100 mt-8">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center space-x-2 mb-4 md:mb-0">
          <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          <span class="text-lg font-semibold text-primary-700">Dashboard</span>
        </div>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-500 hover:text-primary-600 transition-colors duration-200">Privacy</a>
          <a href="#" class="text-gray-500 hover:text-primary-600 transition-colors duration-200">Terms</a>
          <a href="#" class="text-gray-500 hover:text-primary-600 transition-colors duration-200">Contact</a>
        </div>
      </div>
      <div class="mt-4 text-center md:text-left text-sm text-gray-500">
        &copy; {{ new Date().getFullYear() }} Dashboard. All rights reserved.
      </div>
    </div>
  </footer>
</template>