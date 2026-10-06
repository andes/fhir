// release.config.js
module.exports = {
    branches: [
        // 🔹 Rama principal: versión estable
        { name: 'master' },

        // 🔹 Rama de desarrollo: pre-release "beta"
        { name: 'develop', channel: 'beta', prerelease: 'beta' }
    ],

    // Repositorio en GitHub
    repositoryUrl: 'https://github.com/andes/fhir.git',

    plugins: [
        // 1️⃣ Analiza commits según Conv. Commits
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
                releaseRules: [
                    { type: 'docs', scope: 'README', release: 'patch' },
                    { type: 'refactor', release: 'patch' },
                    { type: 'chore', release: false }
                ],
                parserOpts: {
                noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
                }
            }
        ],

        // 2️⃣ Genera notas de release automáticamente
        '@semantic-release/release-notes-generator',

        // 3️⃣ Actualiza el changelog solo en master
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
                changelogTitle: '# Changelog'
            }
        ],

        // 4️⃣ Publica el paquete en npm
        [
            '@semantic-release/npm',
            {
                npmPublish: true,
                pkgRoot: '.'
            }
        ],

        // 5️⃣ Actualiza package.json y changelog solo en master
        [
            '@semantic-release/git',
            {
                assets: ['package.json', 'CHANGELOG.md'],
                message:
                'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
            }
        ],

        // 6️⃣ Publica release en GitHub (tags, changelog, etc.)
        [
            '@semantic-release/github',
            {
                successComment: false,
                failComment: false,
                assets: [
                { path: 'CHANGELOG.md', label: '📘 Changelog' }
                ]
            }
        ]
    ]
};
