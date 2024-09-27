export type GetAdvancedGameSettingsRequestData = undefined;

export type GetAdvancedGameSettingsResponseBody = {
  creativeModeEnabled: boolean;
  advancedGameSettings: Partial<{
    'FG.GameRules.NoPower': 'False' | 'True' | string;
    'FG.GameRules.DisableArachnidCreatures': 'False' | 'True' | string;
    'FG.GameRules.NoUnlockCost': 'False' | 'True' | string;
    'FG.GameRules.SetGamePhase': string; // number as string
    'FG.GameRules.GiveAllTiers': 'False' | 'True' | string;
    'FG.GameRules.UnlockAllResearchSchematics': 'False' | 'True' | string;
    'FG.GameRules.UnlockInstantAltRecipes': 'False' | 'True' | string;
    'FG.GameRules.UnlockAllResourceSinkSchematics': 'False' | 'True' | string;
    'FG.GameRules.GiveItems': 'Empty' | string;
    'FG.PlayerRules.NoBuildCost': 'False' | 'True' | string;
    'FG.PlayerRules.GodMode': 'False' | 'True' | string;
    'FG.PlayerRules.FlightMode': 'False' | 'True' | string;
  }>;
};

export type GetAdvancedGameSettings = {
  functionName: 'getadvancedgamesettings';
  requestType: GetAdvancedGameSettingsRequestData;
  responseType: GetAdvancedGameSettingsResponseBody;
};
