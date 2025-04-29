export function applyFilters(query, filters) {
    // Food preferences - match any preference
    if (filters.preferences && filters.preferences.length > 0) {
        query = query.contains('food_preference', filters.preferences);
        console.log("Food preferences filter applied:", filters.preferences);
    }

    // Allergies - exclude if any allergy matches
    if (filters.allergies && filters.allergies.length > 0) {
        query = query.contains('allergy', filters.allergies);
        console.log("Food preferences filter applied:", filters.preferences);
    }

    // Cost range
    if (filters.costRange !== null && filters.costRange !== undefined) {
        query = query.eq('price', filters.costRange);
        console.log("Food preferences filter applied:", filters.preferences);
    }

    // Spice level
    if (filters.spiceLevel !== null && filters.spiceLevel !== undefined) {
        query = query.eq('spice_level', filters.spiceLevel);
        console.log("Food preferences filter applied:", filters.preferences);
    }

    return query;
}
