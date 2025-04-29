export function applyFilters(query, filters) {
    // Food preferences
    if (filters.preferences && filters.preferences.length > 0) {
      const foodPreferenceFilters = filters.preferences
        .map(pref => `food_preference.like.%${pref}%`)
        .join(',');
      query = query.or(foodPreferenceFilters);
      console.log("Food Preference Filters:", foodPreferenceFilters);
    }
  
    // Allergies (include matches)
    if (filters.allergies && filters.allergies.length > 0) {
      const allergyFilters = filters.allergies
        .map(allergy => `allergy.like.%${allergy}%`)
        .join(',');
      query = query.or(allergyFilters);
    }
  
    // Cost range
    if (filters.costRange !== null && filters.costRange !== undefined) {
      query = query.eq('price', filters.costRange);
    }
  
    // Spice level
    if (filters.spiceLevel !== null && filters.spiceLevel !== undefined) {
      query = query.eq('spice_level', filters.spiceLevel);
    }
  
    return query;
  }
  