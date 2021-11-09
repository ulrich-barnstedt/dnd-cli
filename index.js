const argv = process.argv.slice(2);

switch (argv[0]) {
    case "c":
        require("./core/index");
        break;
    case "m":
        require("./ui/index");
        break;
    default:
        process.exit(0);
}