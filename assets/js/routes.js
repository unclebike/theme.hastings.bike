/**
 * Route Post Template — routes.js
 *
 * On desktop: finds the stats table, walks up to its direct content-level
 * ancestor, moves that element plus any immediately following KG button
 * cards into the sidebar. Stops at the first non-button sibling so body
 * copy placed after the stats stays in the content column.
 * On mobile: does nothing — the table stays in content and CSS styles it.
 */

(function () {
   'use strict';

   if (window.innerWidth < 1025) return;

   var sidebar = document.getElementById('route-stats-sidebar');
   var content = document.querySelector('.route-post-content');

   if (!sidebar || !content) return;

   var table = content.querySelector('table');
   if (!table) return;

   // Walk up from the table to its direct child-of-content ancestor.
   // Handles tables wrapped in .kg-html-card or other Ghost wrappers.
   var splitEl = table;
   while (splitEl.parentElement && splitEl.parentElement !== content) {
      splitEl = splitEl.parentElement;
   }

   // Collect: the stats element + any consecutive KG button cards that follow.
   // Stop at the first sibling that isn't a button card (e.g. a paragraph).
   var toMove = [splitEl];
   var cursor = splitEl.nextElementSibling;
   while (cursor && cursor.classList.contains('kg-button-card')) {
      toMove.push(cursor);
      cursor = cursor.nextElementSibling;
   }

   toMove.forEach(function (el) {
      sidebar.appendChild(el);
      // Rename button labels to a compact sidebar-appropriate string
      if (el.classList.contains('kg-button-card')) {
         var btn = el.querySelector('.kg-btn');
         if (btn) btn.textContent = 'Open in RWGPS';
      }
   });
})();
