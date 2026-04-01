/**
 * Route Post Template — routes.js
 *
 * 1. Extracts stats from the HTML table in post content
 * 2. Populates the desktop sidebar (table is hidden on desktop via CSS)
 * 3. Extracts CTA link(s) and mirrors them in the sidebar
 */

(function () {
   'use strict';

   var statsList = document.getElementById('route-stats-list');
   var sidebarCta = document.querySelector('#route-stats-sidebar .route-stats-cta');
   var postContent = document.querySelector('.route-post-content');

   if (!postContent) return;

   // -----------------------------------------------------------------------
   // 1. Extract stats from the HTML table
   // -----------------------------------------------------------------------
   var table = postContent.querySelector('table');
   var stats = [];

   if (table) {
      table.querySelectorAll('tr').forEach(function (row) {
         var cells = row.querySelectorAll('td, th');
         if (cells.length >= 2) {
            stats.push({
               label: cells[0].textContent.trim(),
               value: cells[1].textContent.trim()
            });
         }
      });
   }

   // -----------------------------------------------------------------------
   // 2. Extract CTA link(s)
   // -----------------------------------------------------------------------
   var ctaButtons = [];

   // KG Button cards first
   postContent.querySelectorAll('.kg-button-card a, .kg-btn').forEach(function (btn) {
      ctaButtons.push({ text: btn.textContent.trim(), href: btn.getAttribute('href') || '#' });
   });

   // Fallback: plain links with download/GPX/cue-sheet text
   if (ctaButtons.length === 0) {
      postContent.querySelectorAll('a').forEach(function (link) {
         var text = link.textContent.trim().toLowerCase();
         if (text.indexOf('download') !== -1 || text.indexOf('gpx') !== -1 || text.indexOf('cue sheet') !== -1 || text.indexOf('ride with gps') !== -1) {
            ctaButtons.push({ text: link.textContent.trim(), href: link.getAttribute('href') || '#' });
         }
      });
   }

   // -----------------------------------------------------------------------
   // 3. Populate sidebar
   // -----------------------------------------------------------------------
   if (statsList && stats.length > 0) {
      statsList.innerHTML = stats.map(function (s) {
         return '<dt>' + s.label + '</dt><dd>' + s.value + '</dd>';
      }).join('');
   }

   if (sidebarCta && ctaButtons.length > 0) {
      sidebarCta.innerHTML = ctaButtons.map(function (btn, i) {
         var cls = i === 0 ? 'route-btn route-btn-primary' : 'route-btn route-btn-secondary';
         return '<a href="' + btn.href + '" class="' + cls + '">' + btn.text + '</a>';
      }).join('');
   }

})();
