/* Copyright 2011 Alasdair Mercer
 * 
 * This file is part of Template.
 * 
 * Template is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Template is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Template. If not, see http://www.gnu.org/licenses/.
 */

/**
 * <p>Responsible for the popup page.</p>
 * @author <a href="http://github.com/neocotic">Alasdair Mercer</a>
 * @since 0.0.2.1
 * @namespace
 */
var popup = {

    /**
     * <p>Initializes the popup page.</p>
     * <p>This involves inserting the HTML prepared by the background page and
     * configuring the display of some elements based on certain conditions
     * being met.</p>
     */
    init: function () {
        var bg = chrome.extension.getBackgroundPage();
        // Inserts prepared HTML in to body element
        document.body.innerHTML = bg.ext.popupHTML;
        // Fix dimensions of template text
        popup.resizePopupText();
    },

    
    /**
     * <p>Calculates the widest text <code>&lt;div/&gt;</code> in the popup
     * and assigns that width to all others.</p>
     * @since 0.1.0.0
     * @private
     */
    resizePopupText: function () {
        var itemList = document.getElementById('itemList'),
            textItems = document.getElementsByClassName('text'),
            scrollWidth = 0,
            width = 0;
        for (var i = 0; i < textItems.length; i++) {
            scrollWidth = textItems[i].scrollWidth;
            if (scrollWidth > width) {
                width = scrollWidth;
            }
        }
        for (var j = 0; j < textItems.length; j++) {
            textItems[j].style.width = width + 'px';
        }
    },

    /**
     * <p>Sends the request to the background page for the clicked template
     * item.</p>
     * @event
     * @param {Element} item The calling template item clicked.
     * @since 0.1.0.0
     */
    sendRequest: function (item) {
        chrome.extension.sendRequest({
            data: {
                name: item.getAttribute('name')
            },
            type: 'popup'
        });
    }

};