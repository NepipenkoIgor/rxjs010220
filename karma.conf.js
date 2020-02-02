module.exports = (config) => {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        plugins: [
            "karma-jasmine",
            "karma-typescript",
            "karma-chrome-launcher",
            "karma-mocha-reporter",
        ],
        files: [
            {pattern: "src/**/!(index).ts"}
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript"]
        },
        reporters: ["mocha", "karma-typescript"],
        browsers: ["ChromeHeadless"],
        logLevel: config.LOG_INFO,
        singleRun: true,
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json',
            reports: {
                "html": "coverage",
                "text": ""
            }
        }

    })
}
