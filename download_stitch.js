const fs = require('fs');
const https = require('https');
const path = require('path');

const screens = [
    { id: 'c8e8130d12b64f0f91e451c8c0993aa9', name: 'Homepage', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzZkMGI4MjM3ZjczOTRiYWZiNjc3MTlhODQ2NGY2YTdhEgsSBxDu09uenwUYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg4NDYwNzAxMjU1NzU1Nzg0Nw&filename=&opi=89354086' },
    { id: '5efac9c33d8a4b009c4c54d27b607211', name: 'Colleges', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzg2ZjZlNzJhOWFiMjRhNGQ5NDg2ZWI3Nzg5M2VlNjNhEgsSBxDu09uenwUYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg4NDYwNzAxMjU1NzU1Nzg0Nw&filename=&opi=89354086' },
    { id: 'dd51a1d9a06e4fdea9b0c86ccef15450', name: 'StudentLMS', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQ0MjQyOGFmNWJiNjQyZTViOGEzOTZlMzU2YzUzYmUzEgsSBxDu09uenwUYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg4NDYwNzAxMjU1NzU1Nzg0Nw&filename=&opi=89354086' },
    { id: '423cc0cc02134fa29cb7e92a176eddfd', name: 'RoleBasedAccess', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzBhOGFjYWMzZmNhYTRlNTNiYmI0ZmMzZDIzZTNiZDBmEgsSBxDu09uenwUYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg4NDYwNzAxMjU1NzU1Nzg0Nw&filename=&opi=89354086' },
    { id: '8bc6996713ba4f67ad337476883f07c3', name: 'TeacherDashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2RiODE1NDI3YjkyODQzYzZhMDQxNWNjOWYyY2MyNGU3EgsSBxDu09uenwUYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg4NDYwNzAxMjU1NzU1Nzg0Nw&filename=&opi=89354086' },
    { id: '809e5b9bd2f348e88b66fd8a5de197de', name: 'AdminDashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzBkNDZkNWY3NTUyNTQ1ODZiNjI2NTEyNjE2N2VkODI2EgsSBxDu09uenwUYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg4NDYwNzAxMjU1NzU1Nzg0Nw&filename=&opi=89354086' },
    { id: '3b20d2a8589349f3b7a4e0ac1cf6055a', name: 'StudentDashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FhODVkMDBiNmNlYTRlMDhiZjI3ZTZhMDRkOTcxNDk1EgsSBxDu09uenwUYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg4NDYwNzAxMjU1NzU1Nzg0Nw&filename=&opi=89354086' },
    { id: '57dda9a6263648ce8556b196d20e7917', name: 'About', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAzNDVhNzBiMTAyMTQ1YWNiNTNiZWQ0Zjk3OGM4MTQ2EgsSBxDu09uenwUYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg4NDYwNzAxMjU1NzU1Nzg0Nw&filename=&opi=89354086' }
];

const destDir = path.join(__dirname, 'frontend', 'stitch_assets');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

screens.forEach(screen => {
    const destPath = path.join(destDir, `${screen.name}.html`);
    const file = fs.createWriteStream(destPath);
    https.get(screen.url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close();  // close() is async, call cb after close completes.
            console.log(`Downloaded ${screen.name}`);
        });
    }).on('error', function (err) {
        fs.unlink(destPath, () => { }); // Delete the file async.
        console.error(`Error downloading ${screen.name}: ${err.message}`);
    });
});
