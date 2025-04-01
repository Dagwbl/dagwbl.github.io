const { exec } = require('child_process');
const path = require('path');

// Remove Node-specific modules at the top
// Keep only the core logic:

module.exports = async (params) => {
    const typechoDir = 'content/posts/typecho';

    const files = app.vault.getFiles()
        .filter(f => f.path.startsWith(typechoDir))
        .filter(f => f.extension === 'md')
        .filter(f => !f.basename.includes('_index'));

    let processed = 0;
    for (const file of files) {
        new Notice(`Processing ${++processed}/${files.length}: ${file.name}`);
        try {
            // Open file in current leaf
            await app.workspace.activeLeaf.openFile(file);

            // Execute translator script directly
            const translator = require(app.vault.adapter.basePath + '/assets/code/hugo_translate.js');
            await translator({});

            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
            new Notice(`Failed ${file.name}: ${e.message}`);
        }
        // Add rate limit handling
        const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5s random delay
    }

    new Notice(`Processed ${files.length} files`);
};
