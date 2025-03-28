const editor = document.getElementById('edit-section');
const preview = document.getElementById('preview-section');
const clear = document.getElementById('clear-btn');

const defaultContent = `# Welcome in Markdown Editor!
## Start typing here...
- [ ] Task 1
- [x] Task 2

- Style your text **bold** or *italic*
`;

function updatePreview(){
    try {
        const previewContent = editor.value;
        const html = marked.parse(previewContent);
        preview.innerHTML = html;
        localStorage.setItem('markdownContent', editor.value);
    } catch (error) {
        console.error('Error while content preview:', error);
        preview.innerHTML = `<p class="error">Something Went Wrong!</p>`;
    }
}

function handleClear() {
    if (confirm('Clear all content?')) {
      editor.value = '';
      preview.innerHTML = '';
      localStorage.removeItem('markdownContent');
    }
  }
  

  
  document.addEventListener('DOMContentLoaded', () => {
    const savedContent = localStorage.getItem('markdownContent');
  
    editor.value = savedContent || defaultContent;
    updatePreview();
  
    editor.addEventListener('input', updatePreview);
    clear.addEventListener('click', handleClear);
  });