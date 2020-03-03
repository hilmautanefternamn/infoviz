import csv
import pandas as pd
import numpy as np

df = pd.read_csv('dead3.csv', delimiter = ';')     



temp_val = df.loc[0, 'Värde']
year = df.loc[0, 'År']





for year in range(1997, 2019):
    rows = df.loc[df['År'] == year]
    
    for region in range(0, 26):
        rows_2 = rows.loc[df['Region'] == region]

        for diagnos in range(1,5):
            rows_3 = rows_2.loc[df['Diagnos'] == diagnos]

            for age in range(1,5):
                rows_4 = rows_3.loc[df['Ålder'] == age]

                # Sum all values in rows_4
                temp_val = rows_4['Värde'].sum()

                index = rows_4.index.values

                # Set current row value to temp_val
                if not len(rows_4):
                    # print ('nothing in this groupd')
                    continue
                else:
                    df.loc[index[len(index)-1], 'Värde'] = temp_val

                    # Set current row measure to false
                    df.loc[index[len(index)-1], 'Mått'] = False

                    #print (rows_4)
                    #print (df.loc[index[len(index)-1]])


    
# # Write with filter
df = df[df.Mått == False]

df.to_csv('finaldead.csv', sep = ';', index = False)
