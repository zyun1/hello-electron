import { Component, HostListener } from "@angular/core";

// electron モジュールのインポート
const electron: Electron.ElectronMainAndRenderer = require("@node/electron");
const remote = electron.remote;
const { Menu, MenuItem, dialog } = remote;

@Component({
    selector: "my-app",
    template: `
    <paper-drawer-panel id="paperDrawerPanel" force-narrow>
        <paper-header-panel drawer>
            <div> Drawer content... </div>
        </paper-header-panel>
        <paper-header-panel mode="seamed" main>
            <paper-toolbar>
                <paper-icon-button icon="menu" onclick="paperDrawerPanel.openDrawer();"></paper-icon-button>
                <span class="title">{{title}}</span>
            </paper-toolbar>
            <div class="content fit" style="height: 100%;">
                <h1>{{message}}</h1>
            </div>
        </paper-header-panel>
    </paper-drawer-panel>
    `,
})
export class AppComponent {
    // ヘッダに表示するタイトル
    title = "Angular 2 & Polymer";
    // 表示するメッセージ
    message = "Hello, Electron with Angular 2";
    // メニュー
    menu: Electron.Menu;

    constructor() {
        // バージョン文字列
        let versionString = `node ${process.versions.node}${"\n"}Chrome ${process.versions.chrome}${"\n"}Electron ${process.versions.electron}`;
        // メニューを生成
        this.menu = new Menu();
        // メニューアイテムを追加
        this.menu.append(new MenuItem({
            label: "バージョン",
            click: () => {
                // ダイアログボックスを表示
                dialog.showMessageBox(remote.getCurrentWindow(), {
                    type: "info",
                    buttons: ["OK"],
                    message: versionString,
                });
            },
        }));
    }

    @HostListener("contextmenu", ["$event"])
    onContextMenu(event: MouseEvent) {
        // 抑止         
        event.preventDefault();
        // メニュー表示
        this.menu.popup(remote.getCurrentWindow());
    }
}