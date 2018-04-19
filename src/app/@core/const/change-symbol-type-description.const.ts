/**
 * ChangeSymbolType are Item changes/deltas for Issue generations
 * The Descriptions can be used in the frontend to explain ChangeSymbolTypeDisplay
 * Generate with query:
 * select convert(varchar(250),ChangeSymbolTypeID) + ': ''' + [Description] + ''','
 * FROM [TSO].[dbo].[ChangeSymbolType]
 */
export const ChangeSymbolTypeDescription = {
    1: 'New Item',
    2: 'UPC Change',
    3: 'Col3 New > Col3 Old',
    4: 'Col3 New < Col3 Old',
    5: 'Discontinued',
    6: 'Deleted',
    7: 'Other',
    8: 'Unlisted',
    9: 'Labor Rate',
    10: 'POA',
    11: 'UOM Change',
    12: 'Catalog Number Change',
    13: 'Commodity Code Change',
    14: 'Item Name Change',
    15: 'Package Weight Change',
    16: 'Extended UOM Change',
    17: 'Extended UOM Qty Change',
    18: 'Price Set Active',
    19: 'AMP New > AMP Old',
    20: 'AMP New < AMP Old'
}