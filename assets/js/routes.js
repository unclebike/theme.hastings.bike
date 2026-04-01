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

   // Primary: proper KG button card class.
   // Fallback: single child that is an <a> (covers unclassed HTML card buttons).
   function isButtonCard(el) {
      return el.classList.contains('kg-button-card') ||
         (el.children.length === 1 && el.firstElementChild.tagName === 'A');
   }

   function isMembersNote(el) {
      return el.querySelector('.route-members-note') !== null;
   }

   // Scan all direct children of content (not just consecutive siblings) so
   // non-matching elements like map iframes don't block button detection.
   var toMove = [splitEl];
   Array.from(content.children).forEach(function (el) {
      if (el !== splitEl && (isButtonCard(el) || isMembersNote(el))) {
         toMove.push(el);
      }
   });

   toMove.forEach(function (el) {
      sidebar.appendChild(el);
   });
})();
