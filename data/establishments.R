
establishments <- unique(dinesafe[,c('establishment_id','establishment_name','establishmenttype','minimum_inspections_peryear','lat','lon','score')])

establishment_types <- data.frame(table(establishments$establishmenttype))
establishment_types <- establishment_types[order(-establishment_types$Freq),]
establishment_types$rt <- 'Other'
establishment_types[1:10,'rt'] <- levels(establishment_types$Var1)[establishment_types[1:10,'Var1']]

establishments <- merge(establishments, establishment_types, by.x='establishmenttype', by.y='Var1')

establishments <- transform(establishments,
    type = rt,
    establishmenttype = NULL,
    rt = NULL
)

write.csv(establishments, 'establishments.csv', row.names=F)
