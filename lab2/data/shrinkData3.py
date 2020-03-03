import csv
import pandas as pd
import numpy as np

df = pd.read_csv('dead2.csv', delimiter = ';')     



print(df[['Region', 'Ålder']])


#df.to_csv(r'dead3.csv')

temp_val = df.loc[0, 'Värde']

for i in range(1, len(df)):     
    #a = df.loc[i, 'Region']
    #print (a)
    #print ('for loop')



    # while region == previous region
    if (df.loc[i, 'Region'] == df.loc[i-1, 'Region']):
        #print ('if 1')
        # while age group == previous age group
        if (df.loc[i, 'Ålder'] == df.loc[i-1, 'Ålder']):
            #print ('if 2')

            # sum up values into temp_val
            temp_val += int(df.loc[i, 'Värde'])
            #print (temp_val)
            # set current Värde to false
            df.loc[i-1, 'Värde'] = False
            
        
    # When age group != previous age group
    if (df.loc[i, 'Ålder'] != df.loc[i-1, 'Ålder']):
        #print ('if 3')

        # Take the previous row, modify its value to be temp_val
        df.loc[i-1, 'Värde'] = temp_val


        # reset temp_val
        temp_val = int(df.loc[i, "Värde"])

        # set current Värde to false
        df.loc[i, 'Värde'] = False


# Write with filter
df = df[df.Värde != False]

df.to_csv('dead3.csv', sep = ';', index = False)

# TODO
# make a fourth script that adds the values of all rows that has same
# year, region, diagnosis, agegroup
