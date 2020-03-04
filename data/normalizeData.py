import csv
import pandas as pd
import numpy as np

# Calculate values in percent.
# The percent is "how many percent of the age group died from this cause"

# IN AND OUTPUT NAMES
# deadper100000_4
# finaldeadper100000
# dead4
# finaldead

df = pd.read_csv('deadper100000_4.csv', delimiter = ';')     

# For every year, calculate total number of death per 100 000 in every age group
# Then divide every row's value with the corrseponding age group's total


for year in range(1997, 2019):
    rows = df.loc[df['År'] == year]       # All rows within one year

    for age in range(1,19):

        rows_2 = rows.loc[df['Ålder'] == age]       # All the rows corresponding to one age group within one year
        
        total = rows_2.loc[df['Region'] == 0]['Värde'].sum() # total in that age group that year
        index = rows_2.index.values                 # All the concerned indices
        df.loc[index, 'Värde'] = rows_2['Värde'] / total

        print (df.loc[index].loc[df['Region'] == 0]['Värde'].sum())       # Should sum to 1

df.to_csv('finaldeadper100000.csv', sep = ';', index = False)
