
establishments <- unique(dinesafe[,c('establishment_id','establishment_name','establishment_address','establishmenttype','minimum_inspections_peryear','lat','lon','score')])

establishment_types <- data.frame(table(establishments$establishmenttype))
establishment_types <- establishment_types[order(-establishment_types$Freq),]


establishment_types$rt <- 'Other'
establishment_types[1:4,'rt'] <- levels(establishment_types$Var1)[establishment_types[1:4,'Var1']]

establishments <- merge(establishments, establishment_types, by.x='establishmenttype', by.y='Var1')

establishments <- transform(establishments,
    type = rt,
    establishmenttype = NULL,
    rt = NULL
)

levels(establishments$type)[levels(establishments$type) == 'Food Store (Convenience / Variety)'] = 'Food Store'
levels(establishments$type)[levels(establishments$type) == 'Food Take Out'] = 'Take Out'

write.csv(establishments, 'establishments.csv', row.names=F)
