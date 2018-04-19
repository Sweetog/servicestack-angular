/**
 * ChangeSymbolType are Item changes/deltas for Issue generations
 * The symbols are there as single characters because that is what many customers understand, based on legacy products.  
 * Including link update.  In link updates, the symbols drive the action in the estimating program with regard to the item.
 * Generate with query:
 *  select convert(varchar(250),ChangeSymbolTypeID) + ': ''' + [DisplayName] + ''','
 * FROM [TSO].[dbo].[ChangeSymbolType]
 */
export const ChangeSymbolTypeDisplay = {
    1: 'N',
    2: 'R',
    3: '+',
    4: '-',
    5: 'D',
    6: 'Q',
    7: 'X',
    8: 'U',
    9: '*',
    10: '$',
    11: 'X',
    12: 'X',
    13: 'X',
    14: 'X',
    15: 'X',
    16: 'X',
    17: 'X',
    18: 'X',
    19: '+',
    20: '-'
}