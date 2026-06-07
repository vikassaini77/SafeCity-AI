import math
from collections import defaultdict

class EventEngine:
    def __init__(self):
        self.prev_centers = {}
        # Tracks how many consecutive frames two IDs have been in close proximity
        self.interaction_frames = defaultdict(int)

    def _center(self, bbox):
        x1, y1, x2, y2 = bbox
        return ((x1 + x2) / 2, (y1 + y2) / 2)

    def detect(self, tracks):
        events = []
        active_tracks = [t for t in tracks if t.is_confirmed()]
        
        # 1. Store current centers and calculate instantaneous speed
        centers = {}
        speeds = {}
        for t in active_tracks:
            bbox = t.to_ltrb()
            center = self._center(bbox)
            centers[t.track_id] = center
            
            # Calculate speed based on previous center
            prev = self.prev_centers.get(t.track_id, center)
            speeds[t.track_id] = math.dist(center, prev)
            self.prev_centers[t.track_id] = center

        # 2. Check pairwise interactions
        for i in range(len(active_tracks)):
            for j in range(i + 1, len(active_tracks)):
                t1 = active_tracks[i]
                t2 = active_tracks[j]

                c1 = centers[t1.track_id]
                c2 = centers[t2.track_id]
                dist = math.dist(c1, c2)

                # Ensure consistent pair ID ordering
                pair_id = tuple(sorted([t1.track_id, t2.track_id]))

                # More Accurate Criteria for Violence:
                # 1. Very close to each other (dist < 120 pixels)
                # 2. Fast/Erratic movement (speed > 8 for at least one of them)
                # 3. Sustained interaction (must happen for at least 5 consecutive frames)
                
                is_close = dist < 120
                is_moving_fast = speeds[t1.track_id] > 8 or speeds[t2.track_id] > 8

                if is_close and is_moving_fast:
                    self.interaction_frames[pair_id] += 1
                    
                    # If they have been fighting for 5+ frames, trigger event
                    if self.interaction_frames[pair_id] >= 5:
                        events.append({
                            "event": "VIOLENCE",
                            "tracks": [t1.track_id, t2.track_id]
                        })
                else:
                    # Reset the interaction counter if they move apart or stop moving
                    self.interaction_frames[pair_id] = 0

        return events
