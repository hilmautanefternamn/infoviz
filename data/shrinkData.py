import csv

# This file saves only the wanted diagnoses and renames them

with open('deadper100000.csv', 'r') as f_input, open('deadper100000_1.csv', 'w') as f_output:
    csv_output = csv.writer(f_output, delimiter = ';')

    data = csv.reader(f_input, delimiter = ';');
    csv_output.writerow(next(data));

    # read 4 lists: sjukdomar, vald, trafik, psykiska
    with open('lists/sjukdomar.csv', 'r') as f:
    	reader = csv.reader(f, delimiter = ';')
    	a = list(reader)
    	sjukdom = [i[0] for i in a]

    with open('lists/psykiska.csv', 'r') as f:
    	reader = csv.reader(f, delimiter = ';')
    	a = list(reader)
    	psykiska = [i[0] for i in a]

    with open('lists/violence.csv', 'r') as f:
    	reader = csv.reader(f, delimiter = ';')
    	a = list(reader)
    	violence = [i[0] for i in a]

    with open('lists/trafik.csv', 'r') as f:
    	reader = csv.reader(f, delimiter = ';')
    	a = list(reader)
    	trafik = [i[0] for i in a]


    for row in data:
    	if len(row[5]) and len(row[6]):		# if value exists
    		if int(row[4]) == 3:			# if both genders
    			if row[3] in sjukdom:			# only include overview data
    				row[3] = 1;
    				csv_output.writerow(row)
    			elif row[3] in psykiska:
    				row[3] = 2;
    				csv_output.writerow(row)
    			elif row[3] in violence:
    				row[3] = 3;
    				csv_output.writerow(row)
    			elif row[3] in trafik:
    				row[3] = 4;
    				csv_output.writerow(row)



    			
    			


