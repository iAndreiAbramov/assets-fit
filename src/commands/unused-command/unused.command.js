export const registerUnusedCommand = (program) => {
    program
        .command('unused')
        .description('Find unused assets')
        .option('-a, --assets <string>', 'Assets directory path', 'src/assets/')
        .option('-f, --files <string>', 'Project files directory path', 'src/')
        .action((args) => {
        const options = program.opts();
        console.log('options', options);
        console.log('args', args);
    });
};
//# sourceMappingURL=unused.command.js.map