
source('loader.R')

scoremodel = data.frame(
  severity=c('S - Significant', 'M - Minor', 'C - Crucial', 'NA - Not Applicable', ''),
  infraction_score=c(1, 6, 15, 0, 0)
)

dinesafe <- merge(dinesafe, scoremodel)

max_inspection = aggregate(list(last_inspection=dinesafe$inspection_date), list(establishment_id=dinesafe$establishment_id), max)
dinesafe <- merge(dinesafe, max_inspection)

dinesafe$infraction_score = dinesafe$infraction_score * 0.996 ^ as.integer(dinesafe$last_inspection - dinesafe$inspection_date)

establishment_scores <- aggregate(list(score=dinesafe$infraction_score), list(establishment_id=dinesafe$establishment_id), sum)
establishment_scores$score <- pmax(round(100 - establishment_scores$score), 0)

dinesafe <- merge(dinesafe, establishment_scores)

hist(establishment_scores$score, breaks=100)
print(length(which(establishment_scores$score < 50)))
