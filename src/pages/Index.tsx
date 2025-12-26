import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface Player {
  nickname: string;
  role: 'main' | 'reserve';
}

interface Team {
  id: string;
  name: string;
  tag: string;
  captain: string;
  players: Player[];
  rating: number;
  wins: number;
  losses: number;
}

interface Tournament {
  id: string;
  name: string;
  game: string;
  date: string;
  prize: string;
  status: 'upcoming' | 'live' | 'finished';
  participants: number;
  maxParticipants: number;
}

const Index = () => {
  const [teams] = useState<Team[]>([
    {
      id: '1',
      name: 'Shadow Riders',
      tag: '[SR]',
      captain: 'DarkPhoenix',
      players: [
        { nickname: 'DarkPhoenix', role: 'main' },
        { nickname: 'NightWolf', role: 'main' },
        { nickname: 'BloodHawk', role: 'main' },
        { nickname: 'IronFist', role: 'main' },
        { nickname: 'SilentKiller', role: 'main' },
        { nickname: 'GhostRider', role: 'reserve' },
        { nickname: 'StormBreaker', role: 'reserve' },
      ],
      rating: 2450,
      wins: 28,
      losses: 5,
    },
    {
      id: '2',
      name: 'Cyber Demons',
      tag: '[CD]',
      captain: 'HellRaiser',
      players: [
        { nickname: 'HellRaiser', role: 'main' },
        { nickname: 'DevilDriver', role: 'main' },
        { nickname: 'FireStorm', role: 'main' },
        { nickname: 'BlazeKing', role: 'main' },
        { nickname: 'InfernoX', role: 'main' },
        { nickname: 'PyroMaster', role: 'reserve' },
      ],
      rating: 2380,
      wins: 25,
      losses: 7,
    },
    {
      id: '3',
      name: 'Toxic Squad',
      tag: '[TX]',
      captain: 'VenomBite',
      players: [
        { nickname: 'VenomBite', role: 'main' },
        { nickname: 'PoisonArrow', role: 'main' },
        { nickname: 'AcidRain', role: 'main' },
        { nickname: 'ToxicWave', role: 'main' },
        { nickname: 'ViperStrike', role: 'main' },
        { nickname: 'CobraX', role: 'reserve' },
        { nickname: 'ScorpionKing', role: 'reserve' },
      ],
      rating: 2310,
      wins: 22,
      losses: 9,
    },
  ]);

  const [tournaments] = useState<Tournament[]>([
    {
      id: '1',
      name: 'WINTER CLASH 2024',
      game: 'GTA SA:MP',
      date: '15.01.2025',
      prize: '500,000₽',
      status: 'upcoming',
      participants: 16,
      maxParticipants: 32,
    },
    {
      id: '2',
      name: 'CYBER SHOWDOWN',
      game: 'CR:MP',
      date: '08.01.2025',
      prize: '300,000₽',
      status: 'live',
      participants: 24,
      maxParticipants: 24,
    },
    {
      id: '3',
      name: 'GRAND BATTLE CUP',
      game: 'GTA 5',
      date: '29.12.2024',
      prize: '750,000₽',
      status: 'finished',
      participants: 32,
      maxParticipants: 32,
    },
  ]);

  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [teamData, setTeamData] = useState({
    teamName: '',
    teamTag: '',
    captain: '',
    mainPlayers: ['', '', '', '', ''],
    reservePlayers: ['', ''],
  });

  const handleRegister = () => {
    if (!teamData.teamName || !teamData.teamTag || !teamData.captain) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    const filledMainPlayers = teamData.mainPlayers.filter(p => p.trim() !== '').length;
    if (filledMainPlayers < 1) {
      toast({
        title: 'Ошибка',
        description: 'Добавьте минимум 1 основного игрока',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Заявка отправлена!',
      description: `Команда ${teamData.teamTag} ${teamData.teamName} зарегистрирована`,
    });

    setRegistrationOpen(false);
    setTeamData({
      teamName: '',
      teamTag: '',
      captain: '',
      mainPlayers: ['', '', '', '', ''],
      reservePlayers: ['', ''],
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-primary text-primary-foreground animate-pulse">🔴 LIVE</Badge>;
      case 'upcoming':
        return <Badge className="bg-secondary text-secondary-foreground">Скоро</Badge>;
      case 'finished':
        return <Badge variant="outline">Завершен</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 hexagon-pattern">
      <header className="border-b border-primary/30 backdrop-blur-sm sticky top-0 z-50 glow-border bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent clip-corner flex items-center justify-center animate-pulse-glow">
                <Icon name="Swords" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-primary glitch tracking-wider">
                  DISASTER ESPORT
                </h1>
                <p className="text-xs text-muted-foreground tracking-widest">GTA • CR:MP • SA:MP</p>
              </div>
            </div>
            <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold clip-corner glow-border">
                  <Icon name="UserPlus" className="mr-2" size={18} />
                  РЕГИСТРАЦИЯ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-primary/30">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-primary">РЕГИСТРАЦИЯ КОМАНДЫ</DialogTitle>
                  <DialogDescription>
                    Заполните форму для участия в турнирах
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teamName">Название команды *</Label>
                      <Input
                        id="teamName"
                        placeholder="Shadow Riders"
                        value={teamData.teamName}
                        onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })}
                        className="border-primary/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teamTag">Тег команды *</Label>
                      <Input
                        id="teamTag"
                        placeholder="[SR]"
                        value={teamData.teamTag}
                        onChange={(e) => setTeamData({ ...teamData, teamTag: e.target.value })}
                        className="border-primary/30"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="captain">Капитан команды *</Label>
                    <Input
                      id="captain"
                      placeholder="Никнейм капитана"
                      value={teamData.captain}
                      onChange={(e) => setTeamData({ ...teamData, captain: e.target.value })}
                      className="border-primary/30"
                    />
                  </div>

                  <div>
                    <Label className="text-lg font-bold mb-3 block">Основной состав (1-5 игроков)</Label>
                    <div className="space-y-2">
                      {teamData.mainPlayers.map((player, idx) => (
                        <Input
                          key={idx}
                          placeholder={`Игрок ${idx + 1}${idx === 0 ? ' *' : ''}`}
                          value={player}
                          onChange={(e) => {
                            const newPlayers = [...teamData.mainPlayers];
                            newPlayers[idx] = e.target.value;
                            setTeamData({ ...teamData, mainPlayers: newPlayers });
                          }}
                          className="border-secondary/30"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-bold mb-3 block">Запасные игроки (до 2)</Label>
                    <div className="space-y-2">
                      {teamData.reservePlayers.map((player, idx) => (
                        <Input
                          key={idx}
                          placeholder={`Запасной ${idx + 1}`}
                          value={player}
                          onChange={(e) => {
                            const newPlayers = [...teamData.reservePlayers];
                            newPlayers[idx] = e.target.value;
                            setTeamData({ ...teamData, reservePlayers: newPlayers });
                          }}
                          className="border-accent/30"
                        />
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleRegister} className="w-full bg-primary hover:bg-primary/90 font-bold py-6 text-lg clip-corner glow-border">
                    <Icon name="Zap" className="mr-2" size={20} />
                    ОТПРАВИТЬ ЗАЯВКУ
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        <section className="relative overflow-hidden rounded-lg border border-primary/40 glow-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/20 to-accent/15" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(192,132,252,0.1),transparent_70%)]" />
          <div className="relative z-10 p-8 md:p-16 text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent glitch">
              АРЕНА ЧЕМПИОНОВ
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto">
              Профессиональная платформа для проведения киберспортивных турниров по GTA, CR:MP и SA:MP.
              Регистрируй команду, участвуй в турнирах и покоряй рейтинги!
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-6 py-3 rounded clip-corner border border-primary/30 glow-border">
                <Icon name="Trophy" className="text-primary" size={24} />
                <span className="font-bold text-xl">{tournaments.length}</span>
                <span className="text-muted-foreground">Турниров</span>
              </div>
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-6 py-3 rounded clip-corner border border-secondary/30 glow-border-accent">
                <Icon name="Users" className="text-secondary" size={24} />
                <span className="font-bold text-xl">{teams.length}</span>
                <span className="text-muted-foreground">Команд</span>
              </div>
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-6 py-3 rounded clip-corner border border-accent/30 glow-border-cyan">
                <Icon name="Target" className="text-accent" size={24} />
                <span className="font-bold text-xl">1.5M₽</span>
                <span className="text-muted-foreground">Призовой фонд</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-black mb-6 text-primary flex items-center gap-3">
            <Icon name="Calendar" size={32} />
            ТУРНИРЫ
          </h3>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-4 bg-muted/50">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="upcoming">Скоро</TabsTrigger>
              <TabsTrigger value="finished">Прошлые</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {tournaments.map((tournament) => (
                <Card key={tournament.id} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all clip-corner">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-2xl font-black text-primary">{tournament.name}</CardTitle>
                        <CardDescription className="text-lg">{tournament.game}</CardDescription>
                      </div>
                      {getStatusBadge(tournament.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" className="text-muted-foreground" size={18} />
                        <span>{tournament.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="DollarSign" className="text-primary" size={18} />
                        <span className="font-bold">{tournament.prize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Users" className="text-secondary" size={18} />
                        <span>{tournament.participants}/{tournament.maxParticipants} команд</span>
                      </div>
                      <Button
                        className="clip-corner bg-secondary hover:bg-secondary/90"
                        disabled={tournament.status === 'finished'}
                      >
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="live" className="space-y-4">
              {tournaments.filter(t => t.status === 'live').map((tournament) => (
                <Card key={tournament.id} className="border-primary/50 bg-gradient-to-br from-card/80 to-primary/5 backdrop-blur-sm clip-corner animate-pulse-glow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-2xl font-black text-primary">{tournament.name}</CardTitle>
                        <CardDescription className="text-lg">{tournament.game}</CardDescription>
                      </div>
                      {getStatusBadge(tournament.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" className="text-muted-foreground" size={18} />
                        <span>{tournament.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="DollarSign" className="text-primary" size={18} />
                        <span className="font-bold">{tournament.prize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Users" className="text-secondary" size={18} />
                        <span>{tournament.participants}/{tournament.maxParticipants} команд</span>
                      </div>
                      <Button className="clip-corner bg-primary hover:bg-primary/90">
                        Смотреть Live
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              {tournaments.filter(t => t.status === 'upcoming').map((tournament) => (
                <Card key={tournament.id} className="border-secondary/50 bg-card/50 backdrop-blur-sm clip-corner">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-2xl font-black text-primary">{tournament.name}</CardTitle>
                        <CardDescription className="text-lg">{tournament.game}</CardDescription>
                      </div>
                      {getStatusBadge(tournament.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" className="text-muted-foreground" size={18} />
                        <span>{tournament.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="DollarSign" className="text-primary" size={18} />
                        <span className="font-bold">{tournament.prize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Users" className="text-secondary" size={18} />
                        <span>{tournament.participants}/{tournament.maxParticipants} команд</span>
                      </div>
                      <Button className="clip-corner bg-secondary hover:bg-secondary/90">
                        Регистрация
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="finished" className="space-y-4">
              {tournaments.filter(t => t.status === 'finished').map((tournament) => (
                <Card key={tournament.id} className="border-border/50 bg-card/30 backdrop-blur-sm clip-corner opacity-75">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-2xl font-black">{tournament.name}</CardTitle>
                        <CardDescription className="text-lg">{tournament.game}</CardDescription>
                      </div>
                      {getStatusBadge(tournament.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" className="text-muted-foreground" size={18} />
                        <span>{tournament.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="DollarSign" className="text-muted-foreground" size={18} />
                        <span className="font-bold">{tournament.prize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Users" className="text-muted-foreground" size={18} />
                        <span>{tournament.participants}/{tournament.maxParticipants} команд</span>
                      </div>
                      <Button variant="outline" className="clip-corner">
                        Результаты
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h3 className="text-3xl font-black mb-6 text-primary flex items-center gap-3">
            <Icon name="Award" size={32} />
            РЕЙТИНГ КОМАНД
          </h3>
          <div className="space-y-4">
            {teams
              .sort((a, b) => b.rating - a.rating)
              .map((team, idx) => (
                <Card key={team.id} className={`border-border/50 bg-card/50 backdrop-blur-sm clip-corner hover:scale-[1.02] transition-transform ${
                  idx === 0 ? 'border-primary glow-border' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 flex items-center justify-center font-black text-2xl clip-corner ${
                          idx === 0 ? 'bg-primary text-primary-foreground' :
                          idx === 1 ? 'bg-secondary text-secondary-foreground' :
                          idx === 2 ? 'bg-accent text-accent-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl font-black text-primary">{team.tag}</span>
                            <span className="text-xl font-bold">{team.name}</span>
                            {idx === 0 && <Icon name="Crown" className="text-primary" size={20} />}
                          </div>
                          <p className="text-sm text-muted-foreground">Капитан: {team.captain}</p>
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-3 gap-4 md:gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-black text-primary">{team.rating}</div>
                          <div className="text-xs text-muted-foreground">Рейтинг</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-secondary">{team.wins}</div>
                          <div className="text-xs text-muted-foreground">Побед</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-muted-foreground">{team.losses}</div>
                          <div className="text-xs text-muted-foreground">Поражений</div>
                        </div>
                      </div>

                      <Button variant="outline" className="clip-corner md:w-auto">
                        <Icon name="Eye" className="mr-2" size={18} />
                        Профиль
                      </Button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex flex-wrap gap-2">
                        {team.players.map((player, pIdx) => (
                          <Badge
                            key={pIdx}
                            variant={player.role === 'main' ? 'default' : 'outline'}
                            className={player.role === 'main' ? 'bg-secondary' : ''}
                          >
                            {player.nickname}
                            {player.role === 'reserve' && ' (З)'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-black mb-6 text-primary flex items-center gap-3">
            <Icon name="Trophy" size={32} />
            ТУРНИРНАЯ СЕТКА
          </h3>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="text-center">
                  <h4 className="text-2xl font-black text-primary mb-4">CYBER SHOWDOWN - ПЛЕЙ-ОФФ</h4>
                  <p className="text-muted-foreground">CR:MP • 1/4 Финала</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h5 className="font-bold text-center text-lg">Верхняя сетка</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-primary/30 rounded clip-corner bg-card hover:border-primary transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-primary">[SR]</span>
                          <span>Shadow Riders</span>
                        </div>
                        <Badge className="bg-primary font-black">2:0</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border/30 rounded clip-corner opacity-60">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-muted-foreground">[NV]</span>
                          <span>Night Vipers</span>
                        </div>
                        <Badge variant="outline">0:2</Badge>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="flex items-center justify-between p-4 border border-secondary/30 rounded clip-corner bg-card hover:border-secondary transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-secondary">[CD]</span>
                          <span>Cyber Demons</span>
                        </div>
                        <Badge className="bg-secondary font-black">2:1</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border/30 rounded clip-corner opacity-60">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-muted-foreground">[BH]</span>
                          <span>Black Hawks</span>
                        </div>
                        <Badge variant="outline">1:2</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-bold text-center text-lg">Нижняя сетка</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-accent/30 rounded clip-corner bg-card hover:border-accent transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-accent">[TX]</span>
                          <span>Toxic Squad</span>
                        </div>
                        <Badge className="bg-accent font-black">2:0</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border/30 rounded clip-corner opacity-60">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-muted-foreground">[FR]</span>
                          <span>Fire Rage</span>
                        </div>
                        <Badge variant="outline">0:2</Badge>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="flex items-center justify-between p-4 border border-primary/30 rounded clip-corner bg-card">
                        <div className="flex items-center gap-3">
                          <span className="font-bold">[DW]</span>
                          <span>Dark Warriors</span>
                        </div>
                        <Badge className="animate-pulse">Live</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-primary/30 rounded clip-corner bg-card">
                        <div className="flex items-center gap-3">
                          <span className="font-bold">[ST]</span>
                          <span>Steel Titans</span>
                        </div>
                        <Badge className="animate-pulse">Live</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button className="bg-primary hover:bg-primary/90 clip-corner glow-border font-bold">
                    <Icon name="Maximize" className="mr-2" size={18} />
                    Полная сетка
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h3 className="text-3xl font-black mb-6 text-primary flex items-center gap-3">
            <Icon name="MessageCircle" size={32} />
            КОНТАКТЫ И ПОДДЕРЖКА
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm clip-corner">
              <CardHeader>
                <CardTitle className="text-xl font-black">Свяжитесь с нами</CardTitle>
                <CardDescription>Ответим на все вопросы по турнирам</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded border border-primary/20 hover:border-primary/50 transition-colors">
                  <Icon name="Mail" className="text-primary" size={24} />
                  <div>
                    <div className="font-bold">Email</div>
                    <div className="text-sm text-muted-foreground">info@disaster-esport.ru</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded border border-secondary/20 hover:border-secondary/50 transition-colors">
                  <Icon name="MessageSquare" className="text-secondary" size={24} />
                  <div>
                    <div className="font-bold">Discord</div>
                    <div className="text-sm text-muted-foreground">discord.gg/disaster-esport</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded border border-accent/20 hover:border-accent/50 transition-colors">
                  <Icon name="Send" className="text-accent" size={24} />
                  <div>
                    <div className="font-bold">Telegram</div>
                    <div className="text-sm text-muted-foreground">@disaster_esport</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm clip-corner">
              <CardHeader>
                <CardTitle className="text-xl font-black">Часто задаваемые вопросы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <details className="group">
                  <summary className="cursor-pointer font-bold p-3 rounded border border-border/50 hover:border-primary/50 transition-colors list-none flex items-center justify-between">
                    Как зарегистрировать команду?
                    <Icon name="ChevronDown" className="group-open:rotate-180 transition-transform" size={20} />
                  </summary>
                  <p className="mt-2 p-3 text-sm text-muted-foreground border-l-2 border-primary/50">
                    Нажмите на кнопку "РЕГИСТРАЦИЯ" в шапке сайта и заполните форму с данными команды и составом игроков.
                  </p>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-bold p-3 rounded border border-border/50 hover:border-primary/50 transition-colors list-none flex items-center justify-between">
                    Сколько игроков в команде?
                    <Icon name="ChevronDown" className="group-open:rotate-180 transition-transform" size={20} />
                  </summary>
                  <p className="mt-2 p-3 text-sm text-muted-foreground border-l-2 border-secondary/50">
                    От 1 до 5 основных игроков и до 2 запасных.
                  </p>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-bold p-3 rounded border border-border/50 hover:border-primary/50 transition-colors list-none flex items-center justify-between">
                    Какие призы?
                    <Icon name="ChevronDown" className="group-open:rotate-180 transition-transform" size={20} />
                  </summary>
                  <p className="mt-2 p-3 text-sm text-muted-foreground border-l-2 border-accent/50">
                    Призовой фонд зависит от турнира - от 300,000₽ до 750,000₽.
                  </p>
                </details>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 DISASTER ESPORT. Профессиональные турниры по GTA & CR:MP & SA:MP
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;