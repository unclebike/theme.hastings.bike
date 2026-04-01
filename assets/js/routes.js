/**
 * Route Post Template — routes.js
 *
 * On desktop: finds the stats table, walks up to its direct content-level
 * ancestor, moves that element plus any immediately following KG button
 * cards and members-note elements into the sidebar. Stops at the first
 * sibling that is neither a button card nor a members note.
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

   function isButtonCard(el) {
      return el.classList.contains('kg-button-card');
   }

   function isMembersNote(el) {
      return el.querySelector('.route-members-note') !== null;
   }

   // Collect: the stats element + any consecutive button cards and members
   // notes that follow. Stop at the first unrelated sibling.
   var toMove = [splitEl];
   var cursor = splitEl.nextElementSibling;
   while (cursor && (isButtonCard(cursor) || isMembersNote(cursor))) {
      toMove.push(cursor);
      cursor = cursor.nextElementSibling;
   }

   toMove.forEach(function (el) {
      sidebar.appendChild(el);
   });
})();
