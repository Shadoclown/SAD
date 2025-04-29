export function applyFilters(query, filters) {
  // Food preferences (match any — OR logic)
  if (filters.preferences && filters.preferences.length > 0) {
    const orConditions = filters.preferences
      .map(pref => `food_preference.cs.${JSON.stringify([pref])}`)
      .join(',');
    query = query.or(orConditions);
    console.log("Food preferences filter applied (OR):", filters.preferences);
  }

  // Allergies (match any — OR logic)
  if (filters.allergies && filters.allergies.length > 0) {
    const orConditions = filters.allergies
      .map(allergy => `allergy.cs.${JSON.stringify([allergy])}`)
      .join(',');
    query = query.or(orConditions);
    console.log("Allergies filter applied (OR):", filters.allergies);
  }

  if (filters.costRange !== null && filters.costRange !== undefined) {
    query = query.eq('price', filters.costRange);
  }

  if (filters.spiceLevel !== null && filters.spiceLevel !== undefined) {
    query = query.eq('spice_level', filters.spiceLevel);
  }

  return query;
}
