/**
 * Route Post Template — routes.js
 *
 * On desktop: finds the stats table in post content, then moves it and all
 * following siblings (GPX button, any other KG button cards) into the sidebar.
 * On mobile: does nothing — the table stays in content and CSS styles it.
 */

(function () {
   'use strict';

   if (window.innerWidth < 1025) return;

   var sidebar  = document.getElementById('route-stats-sidebar');
   var content  = document.querySelector('.route-post-content');

   if (!sidebar || !content) return;

   var table = content.querySelector('table');
   if (!table) return;

   // Move table and every following sibling into the sidebar card
   var el = table;
   while (el) {
      var next = el.nextElementSibling;
      sidebar.appendChild(el);
      el = next;
   }
})();
