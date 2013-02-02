
dinesafe <- read.csv('dinesafe.csv',
                     colClasses=c(
                       'numeric',
                       'character',
                       'character',
                       'character',
                       'factor',
                       'character',
                       'factor',
                       'numeric',
                       'character',
                       'Date',
                       'factor',
                       'factor',
                       'factor',
                       'character'))

dinesafe$amount_fined <- as.numeric(gsub(',', '', dinesafe$amount_fined))

locations <- read.csv('geocode/location.csv', stringsAsFactors=F)

dinesafe <- merge(dinesafe, locations, by.x='establishment_address', by.y='address')

infractions <- data.frame(table(dinesafe[dinesafe$infraction_details != '', c('infraction_details', 'severity')]))
infractions <- infractions[order(-infractions$Freq),]
infractions <- infractions[infractions$Freq > 0,]
