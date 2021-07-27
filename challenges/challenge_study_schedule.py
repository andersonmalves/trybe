def study_schedule(permanence_period, target_time):
    total = 0
    for student in permanence_period:
        try:
            if target_time >= student[0] and target_time <= student[1]:
                total += 1
        except TypeError:
            return None
    return total


permanence_periods = [(4, None), ("0", 4)]
print(study_schedule(permanence_periods, 4))
