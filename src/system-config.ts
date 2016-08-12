const packageNames: string[] = [
    // Angular
    "@angular/core",
    "@angular/common",
    "@angular/compiler",
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",

    // サードパーティー
    "rxjs",
    // 作成するアプリ
    "app"
];

const packages = {};
packageNames.forEach((packageName: string) => {
    (<any>packages)[packageName] = { main: "index" };
});

declare var System: any;

System.config({
    map: {
        "@angular": "../node_modules/@angular",
        "rxjs": "../node_modules/rxjs",
        "main": "index.js"
    },
    packages: packages
});
