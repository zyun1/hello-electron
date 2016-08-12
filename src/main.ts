/// <reference path="../typings/bundle.d.ts" />
"use strict";

import * as electron from "electron";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win: Electron.BrowserWindow;

function createWindow() {
    // ブラウザウインドウを生成
    win = new BrowserWindow({ width: 800, height: 600 });

    // index.html を読み込む
    win.loadURL(`file://${__dirname}/index.html`);

    // ウインドウを閉じる際
    win.on("closed", () => {
        win = null;
    })
}

app.on("ready", createWindow);

// 全てのウインドウが閉じてアプリが終了する際
app.on("window-all-closed", () => {
    // macOS 以外の場合
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    //
    if (win === null) {
        createWindow()
    }
});
