/**
 * Route Post Template — routes.js
 *
 * On desktop: finds the stats table in post content, walks up to its
 * direct content-level ancestor, then moves that element and all following
 * siblings (GPX button, any other KG cards) into the sidebar.
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

   // Walk up from the table to find its direct child-of-content ancestor.
   // Handles the case where Ghost wraps the table in a .kg-html-card div.
   var splitEl = table;
   while (splitEl.parentElement && splitEl.parentElement !== content) {
      splitEl = splitEl.parentElement;
   }

   // Move splitEl and every following sibling into the sidebar card
   var el = splitEl;
   while (el) {
      var next = el.nextElementSibling;
      sidebar.appendChild(el);
      el = next;
   }
})();
