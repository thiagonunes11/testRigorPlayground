import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.csv', '**/*.doc', '**/*.docx', '**/*.odp', '**/*.ods', '**/*.odt', '**/*.ott', '**/*.pdf', '**/*.ppt', '**/*.pptx', '**/*.rtf', '**/*.txt', '**/*.xls', '**/*.xlsx'],
});
