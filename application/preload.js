const { CustomTitlebar, TitlebarColor } = require('custom-electron-titlebar')

window.addEventListener('DOMContentLoaded', () => {
    new CustomTitlebar({
        backgroundColor: TitlebarColor.TRANSPARENT,
        containerOverflow: 'hidden',
        menuTransparency: 0.2,
        tooltips: {
            minimize: 'Minimize',
            close: 'Close',
        }
    })
})