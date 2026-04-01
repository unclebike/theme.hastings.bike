/**
 * Route Post Template — routes.js
 *
 * 1. Extracts stats from the HTML table in post content
 * 2. Populates the sidebar (desktop) and mobile stats components
 * 3. Manages sticky sidebar with IntersectionObserver unstick
 * 4. Hides the original table from the content flow
 */

(function () {
   'use strict';

   var sidebar = document.getElementById('route-stats-sidebar');
   var statsList = document.getElementById('route-stats-list');
   var mobileContainer = document.getElementById('route-stats-mobile');
   var sentinel = document.getElementById('route-sticky-sentinel');
   var postContent = document.querySelector('.route-post-content');

   if (!postContent) return;

   // -----------------------------------------------------------------------
   // 1. Extract stats from the HTML table
   // -----------------------------------------------------------------------
   var table = postContent.querySelector('table');
   var stats = [];

   if (table) {
      var rows = table.querySelectorAll('tr');
      rows.forEach(function (row) {
         var cells = row.querySelectorAll('td, th');
         if (cells.length >= 2) {
            stats.push({
               label: cells[0].textContent.trim(),
               value: cells[1].textContent.trim()
            });
         }
      });

      // Mark original table for hiding via CSS
      table.classList.add('route-data-table');
   }

   // -----------------------------------------------------------------------
   // 2. Find CTA button(s) in the post content
   // -----------------------------------------------------------------------
   var ctaButtons = [];
   var buttonCards = postContent.querySelectorAll('.kg-button-card a, .kg-btn');
   buttonCards.forEach(function (btn) {
      ctaButtons.push({
         text: btn.textContent.trim(),
         href: btn.getAttribute('href') || '#'
      });
   });

   // Fallback: look for regular links that look like CTAs
   if (ctaButtons.length === 0) {
      var links = postContent.querySelectorAll('a');
      links.forEach(function (link) {
         var text = link.textContent.trim().toLowerCase();
         if (text.indexOf('download') !== -1 || text.indexOf('gpx') !== -1 || text.indexOf('cue sheet') !== -1 || text.indexOf('ride with gps') !== -1) {
            ctaButtons.push({
               text: link.textContent.trim(),
               href: link.getAttribute('href') || '#'
            });
         }
      });
   }

   // -----------------------------------------------------------------------
   // 3. Populate sidebar stats (desktop)
   // -----------------------------------------------------------------------
   if (statsList && stats.length > 0) {
      var sidebarHTML = '';
      stats.forEach(function (stat) {
         sidebarHTML += '<dt>' + stat.label + '</dt>';
         sidebarHTML += '<dd>' + stat.value + '</dd>';
      });
      statsList.innerHTML = sidebarHTML;
   }

   // Populate sidebar CTA
   var sidebarCta = sidebar ? sidebar.querySelector('.route-stats-cta') : null;
   if (sidebarCta && ctaButtons.length > 0) {
      var sidebarCtaHTML = '';
      ctaButtons.forEach(function (btn, i) {
         var cls = i === 0 ? 'route-btn route-btn-primary' : 'route-btn route-btn-secondary';
         sidebarCtaHTML += '<a href="' + btn.href + '" class="' + cls + '">' + btn.text + '</a>';
      });
      sidebarCta.innerHTML = sidebarCtaHTML;
   }

   // -----------------------------------------------------------------------
   // 4. Populate mobile stats (2-column grid)
   // -----------------------------------------------------------------------
   if (mobileContainer && stats.length > 0) {
      var mobileHTML = '<div class="route-stats-mobile-inner">';
      mobileHTML += '<h2 class="route-stats-title">At a Glance</h2>';
      mobileHTML += '<dl class="route-stats-grid">';

      stats.forEach(function (stat) {
         mobileHTML += '<div class="route-stat-item">';
         mobileHTML += '<dt>' + stat.label + '</dt>';
         mobileHTML += '<dd>' + stat.value + '</dd>';
         mobileHTML += '</div>';
      });

      mobileHTML += '</dl>';

      // Mobile CTAs
      if (ctaButtons.length > 0) {
         mobileHTML += '<div class="route-stats-cta">';
         ctaButtons.forEach(function (btn, i) {
            var cls = i === 0 ? 'route-btn route-btn-primary' : 'route-btn route-btn-secondary';
            mobileHTML += '<a href="' + btn.href + '" class="' + cls + '">' + btn.text + '</a>';
         });
         mobileHTML += '</div>';
      }

      mobileHTML += '</div>';
      mobileContainer.innerHTML = mobileHTML;
   }

   // -----------------------------------------------------------------------
   // 5. Sticky sidebar with IntersectionObserver unstick
   // -----------------------------------------------------------------------
   if (sidebar && sentinel && typeof IntersectionObserver !== 'undefined') {
      var observer = new IntersectionObserver(function (entries) {
         entries.forEach(function (entry) {
            if (entry.isIntersecting) {
               sidebar.classList.add('is-unstuck');
            } else {
               sidebar.classList.remove('is-unstuck');
            }
         });
      }, {
         root: null,
         rootMargin: '0px 0px -50% 0px',
         threshold: 0
      });

      observer.observe(sentinel);
   }
})();
