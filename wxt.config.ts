import { defineConfig } from 'wxt';
import pkg from './package.json';

// See https://wxt.dev/api/config.html
export default defineConfig({
  runner: {
    binaries: {
      chrome: 'D:/software/Chrome/App/chrome.exe',
      edge: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    },
    startUrls: ['https://linux.do'],
  },
  vite: () => ({
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'arcoblue-6': '#2C3E50',
          },
        },
      },
    },
    build: {
      // 调整chunk大小警告限制到1MB（适合浏览器扩展）
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // 浏览器扩展通常使用内联动态导入，因此移除manualChunks
          // manualChunks与inlineDynamicImports冲突
          // 浏览器扩展环境下，内联导入更安全且兼容性更好
          
          // 优化文件命名（保留这部分优化）
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: '[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      },
      // 启用高效压缩和tree shaking
      minify: 'esbuild',
      // 关闭源码映射以减小文件大小
      sourcemap: false,
      // 优化依赖预构建
      optimizeDeps: {
        include: ['vue', 'element-plus', '@arco-design/web-vue']
      },
      // 浏览器扩展特定优化
      target: ['chrome89', 'firefox88'], // 现代浏览器target
      // 减少不必要的polyfill
      modulePreload: false
    }
  }),
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: 'LinuxDo Scripts',
    version: pkg.version,
    description: '为 linux.do 用户提供了一些增强功能。',
    permissions: ['storage', 'sidePanel'],
    host_permissions: ['http://*/*', 'https://*/*'],
    side_panel: {
      default_path: 'sidepanel.html'
    },
  },
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      if (wxt.config.command === 'serve') {
        manifest.content_scripts ??= [];
        manifest.content_scripts.push({
          matches: ['https://linux.do/*'],
          js: ['content-scripts/content.js'],
          css: ['content-scripts/content.css']
        });
      }
    }
  }
});
