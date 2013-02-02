
from xml.dom.minidom import parse
from csv import DictWriter

fields = [
  'row_id',
  'establishment_id',
  'inspection_id',
  'establishment_name',
  'establishmenttype',
  'establishment_address',
  'establishment_status',
  'minimum_inspections_peryear',
  'infraction_details',
  'inspection_date',
  'severity',
  'action',
  'court_outcome',
  'amount_fined'
]

doc = parse(file('dinesafe.xml'))

writer = DictWriter(file('dinesafe.csv', 'w'), fields)
writer.writeheader()

row_data = doc.getElementsByTagName('ROWDATA')[0]

for row in row_data.getElementsByTagName('ROW'):
    row_values = dict()
    for field in fields:
        text_element = row.getElementsByTagName(field.upper())[0].firstChild
        value = ''
        if text_element:
            value = text_element.wholeText.strip()
        row_values[field] = value
    writer.writerow(row_values)

