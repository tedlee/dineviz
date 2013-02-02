
establishments <- unique(dinesafe[,c('establishment_id','establishment_name','establishmenttype','minimum_inspections_peryear','lat','lon','score')])

write.csv(establishments, 'establishments.csv', row.names=F)
