
from urllib2 import urlopen, quote
from sys import stdin, stdout
from json import loads
from csv import DictWriter, reader
from time import sleep

BASE_URL = 'http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false'

ADDRESS = '%s, Toronto, Ontario'

fields = ['address', 'formatted_address', 'lat', 'lon', 'status', 'error']

writer = DictWriter(stdout, fields)
reader = reader(stdin)

for address, in reader:
    row = dict()

    row['address'] = address
    address = ADDRESS % address
    url = BASE_URL % quote(address)

    try:
        response = loads(urlopen(url).read())
        row['status'] = response['status']
        if response['status'] == 'OK':
            result = response['results'][0]
            row['formatted_address'] = result['formatted_address']
            row['lat'] = result['geometry']['location']['lat']
            row['lon'] = result['geometry']['location']['lng']

    except None, e:
        row['error'] = '%s: %s' % (e.__class__.__name__, e.message)

    writer.writerow(row)
    sleep(1)

