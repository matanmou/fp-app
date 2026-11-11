import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("iplpredict_teams")
export class IplPredictTeams{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teamName: string;

    @Column()
    pColor: string;

    @Column()
    sColor: string;
}