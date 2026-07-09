/**
 * Utility functions for interacting with the Open Food Facts API
 */

const BASE_URL = 'https://it.openfoodfacts.org/cgi/search.pl';

/**
 * Searches for food products by name.
 * Sorts by popularity (unique_scans_n) to ensure basic foods like "Latte" appear first.
 * 
 * @param {string} query The search term
 * @param {number} limit Number of results to return (default 15)
 * @returns {Promise<Array>} Array of product objects
 */
export const searchFood = async (query, limit = 15) => {
  if (!query || query.trim().length === 0) return [];

  const url = `${BASE_URL}?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=${limit}&sort_by=unique_scans_n`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // In production/goal mode we want the console pristine
      return [];
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    // Suppress console errors for a pristine experience
    return [];
  }
};
