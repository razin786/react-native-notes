import QuillSnowCSS from "./quill/QuillSnowCSS.js";
import QuillJS from "./quill/QuillJS.js";
import colors from "../config/colors.js";


export default combinedHtml = (theme) => {
    return String.raw`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
        <style>${QuillSnowCSS(theme)}</style>
    </head>

    <body style="background-color: ${colors[theme].primary}">
        <div id="toolbar" style="background-color: ${colors[theme].primary}">
            <span class="ql-formats">
                <select class="ql-font">
                    <option selected></option>
                    <option value="serif"></option>
                    <option value="monospace"></option>
                </select>
            </span>

            <span class="ql-formats">
                <select class="ql-size">
                    <option value="small"></option>
                    <option selected></option>
                    <option value="large"></option>
                </select>
            </span>

            <span class="ql-formats">
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-underline"></button>
                <button class="ql-strike"></button>
            </span>

            <span class="ql-formats">
                <select class="ql-color">
                    <option value="rgb(0, 0, 0)" />
                    <option value="rgb(230, 0, 0)" />
                    <option value="rgb(255, 153, 0)" />
                    <option value="rgb(255, 255, 0)" />
                    <option value="rgb(0, 138, 0)" />
                    <option value="rgb(0, 102, 204)" />
                    <option value="rgb(153, 51, 255)" />
                    <option value="rgb(255, 255, 255)" />
                    <option value="rgb(250, 204, 204)" />
                    <option value="rgb(255, 235, 204)" />
                    <option value="rgb(204, 224, 245)" />
                    <option value="rgb(235, 214, 255)" />
                    <option value="rgb(187, 187, 187)" />
                    <option value="rgb(102, 185, 102)" />
                </select>

                <select class="ql-background">
                    <option value="rgb(0, 0, 0)" />
                    <option value="rgb(230, 0, 0)" />
                    <option value="rgb(255, 153, 0)" />
                    <option value="rgb(255, 255, 0)" />
                    <option value="rgb(0, 138, 0)" />
                    <option value="rgb(0, 102, 204)" />
                    <option value="rgb(153, 51, 255)" />
                    <option value="rgb(255, 255, 255)" />
                    <option value="rgb(250, 204, 204)" />
                    <option value="rgb(255, 235, 204)" />
                    <option value="rgb(204, 224, 245)" />
                    <option value="rgb(235, 214, 255)" />
                    <option value="rgb(187, 187, 187)" />
                    <option value="rgb(102, 185, 102)" />
                </select>
            </span>
            
            <span class="ql-formats">
                <select class="ql-align">
                    <option selected />
                    <option value="right" />
                    <option value="center" />
                    <option value="justify" />
                </select>
            </span>
                
            <span class="ql-formats">
                <button class="ql-list" value="bullet"></button>
                <button class="ql-list" value="ordered"></button>
            </span>

            <span class="ql-formats">
                <button class="ql-link"></button>
                <button class="ql-image"></button>
            </span>

        </div>
        <div class="editor1" id="quill"></div>

        <script>${QuillJS}</script>

        <script>
            var quillOptions = {
            modules: {
            toolbar: "#toolbar"
            },
            placeholder: 'Note',
            theme: "snow"
            };

            var quill = new Quill("#quill", quillOptions);

            function saveRequest() {
                var delta = quill.getContents();
                window.ReactNativeWebView.postMessage(JSON.stringify(delta));
            }
        </script>
    </body>
</html>`};
