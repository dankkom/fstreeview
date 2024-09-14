function buildFileSystemTree(metadata) {
    const tree = {
        name: 'root',
        type: 'directory',
        children: []
    };

    metadata.forEach(({ directory, filename }) => {
        const path = directory.split('/');
        let currentNode = tree;

        path.forEach((name) => {
            let childNode = currentNode.children.find((node) => node.name === name);

            if (!childNode) {
                childNode = {
                    name,
                    type: 'directory',
                    children: []
                };
                currentNode.children.push(childNode);
            }

            currentNode = childNode;
        });

        currentNode.children.push({
            name: filename,
            type: 'file'
        });
    });

    return tree;
}

function createTreeView(treeData, parentElement = fileSystemTree) {
    const ul = document.createElement('ul');
    if (parentElement !== fileSystemTree) {
        ul.classList.add('nested');
    }
    parentElement.appendChild(ul);

    for (const node of treeData.children) {
        const li = document.createElement('li');
        ul.appendChild(li);

        const icon = document.createElement('span');
        icon.textContent = node.name;
        icon.classList.add(node.type === 'directory' ? 'caret' : 'file');
        li.appendChild(icon);

        if (node.type === 'directory') {
            createTreeView(node, li);
        }
    }
}
