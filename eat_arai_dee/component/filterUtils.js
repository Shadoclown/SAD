export function applyFilters(query, filters) {
  // Food preferences (JSONB array match - contains ALL)
  if (filters.preferences.length > 0) {
    const orConditions = filters.preferences
      .map(pref => `food_preference.cs.{${JSON.stringify([pref]).slice(1, -1)}}`)
      .join(',');
    query = query.or(orConditions);
  }
  

  // Allergies (JSONB array match - contains ALL)
  if (filters.allergies && filters.allergies.length > 0) {
    const orConditions = filters.allergies
      .map(allergy => `allergy.cs.{${JSON.stringify([allergy]).slice(1, -1)}}`)
      .join(',');
    query = query.or(orConditions);
    console.log("Allergies filter applied:", filters.allergies);
  }

  // Cost range
  if (filters.costRange !== null && filters.costRange !== undefined) {
    query = query.eq('price', filters.costRange);
    console.log("Cost range filter applied:", filters.costRange);
  }

  // Spice level
  if (filters.spiceLevel !== null && filters.spiceLevel !== undefined) {
    query = query.eq('spice_level', filters.spiceLevel);
    console.log("Spice level filter applied:", filters.spiceLevel);
  }

  return query;
}
