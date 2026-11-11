import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("iplpredict_picks")
export class IplPredictPicks{
    @PrimaryColumn()
    id: string;

    @Column()
    predictName: string;

    @Column()
    userName: string;
    
    @Column()
    date: string;
    
    @Column()
    season: number;
    
    @Column()
    p1: number;
    
    @Column()
    p2: number;
    
    @Column()
    p3: number;
    
    @Column()
    p4: number;
    
    @Column()
    p5: number;
    
    @Column()
    p6: number;
    
    @Column()
    p7: number;
    
    @Column()
    p8: number;
    
    @Column()
    p9: number;
    
    @Column()
    p10: number;
    
    @Column()
    p11: number;
    
    @Column()
    p12: number;
    
    @Column()
    p13: number;
    
    @Column()
    p14: number;
}